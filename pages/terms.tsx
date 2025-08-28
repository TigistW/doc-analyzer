import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Terms({ content }: { content: string }) {
  return (
    <div className="prose bg-white text-sm text-gray-600 lg:prose-xl mx-auto px-24 p-10">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "/content/legal/terms-of-service.md");
  const content = fs.readFileSync(filePath, "utf-8");

  return { props: { content } };
}
