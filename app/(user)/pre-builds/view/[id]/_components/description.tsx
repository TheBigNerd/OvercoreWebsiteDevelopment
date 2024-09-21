import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { MDXRemote } from "next-mdx-remote/rsc";

import styles from "./md.module.scss";

const options = {
	mdxOptions: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeHighlight],
	}
}

export default async function Description({ description } : { description: string }) {
	const { data, content } = matter(description);
	
	return (
		<section className={styles.md}>
			<MDXRemote source={content} options={options} />
		</section>
	);
    
}