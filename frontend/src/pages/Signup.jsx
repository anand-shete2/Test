import { z } from "zod";
import api from "@/api";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate } from "react-router";
import google from "@/assets/google.svg";
import { Loader } from "@/components/common";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name field in required" }),
  email: z.string().min(1, { message: "Email field in required" }),
  password: z.string().min(1, { message: "Password field in required" }),
  profileImageURL: z
    .instanceof(FileList)
    .refine(files => !files || files[0].type.startsWith("image"), "File must be an image")
    .optional(),
});

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profileImageURL: undefined, // FileList cannot default to ""
    },
  });

  const Oauth = async () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URI}/user/auth/google`;
  };

  const submit = async data => {
    try {
      setLoading(true);
      const file = data?.profileImageURL?.[0];
      let profileImageURL;

      const check = await api.post("/user/check", data);
      if (check.data) {
        toast.error("Account Already exists, please Login");
        return;
      }

      if (file && file.size > 500000) {
        toast.error("Profile Image must be less than 500KB");
        return;
      }

      // configured CORS policy of the bucket
      if (file) {
        const res = await api.post("/user/generate-signed-url", { type: file.type });
        const url = res.data.url;
        await axios.put(url, file, {
          headers: { "Content-Type": file.type },
        });
        profileImageURL = url.split("?")[0];
      }

      const res = await api.post("/user/signup", { ...data, profileImageURL });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Account couldn't be created");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center bg-neutral-200">
      <Card className="md:min-w-110 m-5 px-5 text-center shadow-2xl shadow-black">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Create your Blogify account and Start writing</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon Doe" type="text" autoComplete="on" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jhon@gmail.com"
                        type="email"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="123" type="password" autoComplete="on" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profileImageURL" // must be same in backend
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1">Profile Image (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={e => field.onChange(e.target.files)}
                        className={"file:mr-2 file:cursor-pointer file:font-bold"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Sign Up</Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t">
                <span className="z-1 bg-background text-muted-foreground relative px-2">
                  Or continue with
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full border-black"
                onClick={Oauth}
                type="button"
              >
                <img src={google} alt="google Logo" className="h-4" />
                Sign Up with Google
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <NavLink to="/login" className="underline underline-offset-4">
                  Login
                </NavLink>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
