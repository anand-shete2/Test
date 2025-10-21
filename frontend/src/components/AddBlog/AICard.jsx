import React from "react";

const AICard = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl">
        <Brain className="text-primary relative top-[-3px] mr-2 inline" />
        AI Suggestions
      </CardTitle>
      <span className="text-muted-foreground text-sm">
        Use Artificial Intelligence to refine your content.
      </span>
      <CardDescription>
        <Button
          className="mt-4 transition-all duration-200 hover:scale-110"
          onClick={enchance}
          type="button"
        >
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
);
export default AICard;
