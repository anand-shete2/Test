import { z } from "zod";
import api from "@/api";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { htmlToText } from "html-to-text";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { Brain, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useEditBlog from "@/hooks/useEditBlog";
import { Loader } from "@/components/common";

const formSchema = z.object({
  title: z.string().min(1, { message: "Blog Title required" }),
  content: z.string().min(1, { message: "Content cannot be empty" }),
  blogCoverImage: z
    .instanceof(FileList)
    .refine(files => !files || files[0].type.startsWith("image"), "File must be an image")
    .optional(),
});

export default function EditBlog() {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const user = useSelector(user => user.user);
  const [generate, setGenerate] = useState("");
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [useAI, setUseAI] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      blogCoverImage: undefined,
    },
  });

  const { blog } = useEditBlog();

  useEffect(() => {
    if (blog.content && blog.title) {
      form.reset({
        content: blog.content,
        title: blog.title,
      });
    }
  }, [blog.content, blog.title]);

  const submit = async data => {
    try {
      const file = data?.blogCoverImage?.[0];
      let coverImageURL;

      if (file) {
        const res = await api.get("/blog/generate-signed-url");
        const url = res.data.url;
        await axios.put(url, file, {
          headers: { "Content-Type": file.type },
        });
        coverImageURL = url.split("?")[0];
      }
      const res = await api.post(`/blog/edit/${blogId}`, {
        ...data,
        coverImageURL,
        _id: user._id,
      });
      navigate("/dashboard");
      toast.success(res.data.message);
    } catch (error) {
      // fixme error ocurring here
      toast.error(error.respose.data.message || "Some Error Occured");
    }
  };

  const enchance = async () => {
    if (!contentRef.current.getContent() || !titleRef.current.value) {
      toast.warning("Both Title and Content are required");
      return;
    }

    try {
      setUseAI(true);
      const plainText = htmlToText(contentRef.current.getContent(), {
        wordwrap: false,
        selectors: [
          { selector: "a", options: { ignoreHref: true } },
          { selector: "sup", format: "skip" },
        ],
      });

      const res = await api.post("/blog/improve", {
        content: plainText,
        title: titleRef.current.value,
      });

      setGenerate(res.data.content);
      setUseAI(false);
    } catch (error) {}
  };

  return (
    <div className="m-10 flex min-w-full flex-col sm:m-20">
      <Button className="mb-5 w-fit self-end hover:scale-110" onClick={form.handleSubmit(submit)}>
        <Check />
        Done
      </Button>
      <Form {...form} className="">
        <form onSubmit={form.handleSubmit(submit)} className="flex flex-col space-y-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1 text-2xl">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Blog Title"
                    type="text"
                    className="p-3"
                    {...field}
                    ref={el => {
                      field.ref(el); // attach RHF's ref
                      titleRef.current = el; // attach our custom ref
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blogCoverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1 text-2xl">Cover Image (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={e => field.onChange(e.target.files)}
                    className="cursor-pointer file:mr-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                <Brain className="relative top-[-3px] mr-1 inline text-green-600" />
                AI Suggestions
              </CardTitle>
              <span className="text-muted-foreground text-sm">
                Use Artificial Intelligence to refine your content.
              </span>
              <CardDescription>
                <Button
                  className="transition-all duration-200 hover:scale-110 hover:bg-green-600"
                  onClick={enchance}
                  type="button"
                >
                  <Brain />
                  Get Suggestions
                </Button>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {useAI ? (
                <p>Please Wait...</p>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{generate}</ReactMarkdown>
              )}
            </CardContent>
          </Card>

          {/* Tiny MCE editor */}
          {loading && <Loader />}

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1 text-2xl">Text Editor</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    onInit={(evt, editor) => {
                      contentRef.current = editor;
                      setLoading(false);
                    }}
                    onEditorChange={(newContent, editor) => {
                      field.onChange(newContent);
                    }}
                    value={field.value} // Bind to form state
                    init={{
                      plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                      height: 500,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="max-w-[20vh]">
            <Check />
            Done
          </Button>
        </form>
      </Form>
    </div>
  );
}
