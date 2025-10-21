import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { NavLink, useNavigate, useLocation } from "react-router";
import api from "@/api";
import { toast } from "sonner";
import google from "@/assets/google.svg";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email field in required" }),
  password: z.string().min(1, { message: "Password field in required" }),
});

export default function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();

  if (search.split("?")[1] === "OAuthError") {
    toast.error("Google Authentication Error");
  }

  // if(search.split("?")[1] == )
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // plain simple redirect to backend
  const Oauth = async () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URI}/user/auth/google`;
  };

  const submit = async data => {
    try {
      const res = await api.post("/user/signin", data);
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data);
      if (error.status == 404) navigate("/signup");
      toast.error(error.response.data.message || "Login Failed");
    }
  };

  return (
    <div className="flex min-w-full flex-col items-center justify-center bg-neutral-200">
      <Card className="md:min-w-110 mx-5 my-20 px-5 text-center shadow-2xl shadow-black">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your details below to Login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col space-y-5">
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
              <Button type="submit">Login</Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
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
                Login with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <NavLink to="/signup" className="underline underline-offset-4">
                  Sign up
                </NavLink>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
