export default function PostDetailRichText({PostDetails}: any) {
  return (
    <div className="rte" dangerouslySetInnerHTML={{ __html: PostDetails.content?.rendered }}>
      
    </div>
  );
}
