const PostMention = ({ mentionData }: { mentionData: string[] }) => {
  return (
    <p className={`flex text-xs items-center gap-2 text-dark-gray`}>
      {mentionData?.slice(0, 3).map((item, index) => (
        <span
          key={index}
          className={` font-semibold text-blue `}
        >{`@${item}`}</span>
      ))}
      {mentionData?.length > 3 && (
        <span className={` font-normal`}>{`+${
          mentionData.length - 3
        } người khác`}</span>
      )}
    </p>
  );
};

export default PostMention;
