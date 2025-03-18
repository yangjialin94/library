import { clsx } from "clsx";

// Define the type for the message
interface MessageProps {
  msg: {
    type: string;
    sid: string;
    username: string;
    message?: string;
  };
  isSelf: boolean;
}

/**
 * Message component that displays a message based on its type.
 */
export const Message = ({ msg, isSelf }: MessageProps) => {
  const { sid, username, type, message = "" } = msg;

  // Render for join and leave events
  if (type === "join" || type === "leave") {
    return (
      <p
        className={clsx(
          "my-2 flex w-full justify-center text-sm",
          type === "join" && "text-green-500",
          type === "leave" && "text-red-500"
        )}
      >
        {username} has {type === "join" ? "joined" : "left"}
      </p>
    );
  }

  // Render for chat messages
  if (type === "chat") {
    return (
      <div className={clsx("my-3 flex w-full", isSelf ? "justify-end" : "justify-start")}>
        <div
          className={clsx(
            "group relative max-w-[80%] rounded-xl px-3 py-2 break-words shadow-sm transition-all",
            isSelf ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
          )}
        >
          {isSelf ? (
            <p>{message}</p>
          ) : (
            <p>
              <strong>{username}:</strong> {message}
            </p>
          )}

          <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
            {sid}
          </span>
        </div>
      </div>
    );
  }
};
