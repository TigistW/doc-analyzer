import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PrivacyPolicy({ content }: { content: string }) {
  return (
    <div className="prose lg:prose-xl mx-auto p-10 px-24 bg-white text-sm text-gray-600">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "/content/legal/privacy-policy.md");
  const content = fs.readFileSync(filePath, "utf-8");

  return { props: { content } };
}
