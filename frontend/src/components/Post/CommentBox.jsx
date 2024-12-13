import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";

dayjs.extend(relativeTime);
dayjs.locale("tr");

const CommentBox = ({ comment }) => {
  return (
    <div className="w-full flex flex-col p-6 border mt-5 rounded-xl">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-x-2 items-start ">
          <img
            src={comment?.creatorImage}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col">
            <h1>{comment?.creatorName}</h1>
            <span className="text-sm">@{comment?.creatorUsername}</span>
          </div>
        </div>
        <div className="text-sm text-neutral-400">
          {dayjs(comment?.createdAt).fromNow()}
        </div>
      </div>
      <div className="w-full bg-zinc-50 mt-4 p-3 border rounded-md">
        {comment?.comment}
      </div>
    </div>
  );
};

export default CommentBox;
