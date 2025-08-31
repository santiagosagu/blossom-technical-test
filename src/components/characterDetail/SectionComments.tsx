import { useCommentStore } from "@/store/commentStore";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function SectionComments({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { comments, addComment } = useCommentStore();

  const characterComments = comments[id] || [];

  const disableButtomSubmit =
    !comment.trim() ||
    isSubmitting ||
    !userName.trim() ||
    comment.trim().length > 280;

  const handleSubmitComment = async () => {
    if (disableButtomSubmit) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    addComment(id, { author: userName, text: comment, characterId: id });
    setIsSubmitting(false);
    setUserName("");
    setComment("");
  };

  return (
    <div className="my-8 pt-6 w-full ">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-primary-700" />
          <h2 className="text-lg font-semibold">Add a comment</h2>
        </div>

        <div className="space-y-2 w-full">
          <label htmlFor="userName" className="text-sm font-medium">
            Your name
          </label>
          <input
            id="userName"
            placeholder="Enter your name..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={isSubmitting}
            className="resize-none focus:ring-primary/20 border border-gray-300 rounded-md px-4 py-3 text-base text-gray-700 w-full"
          />
        </div>

        <div className="space-y-3 w-full">
          <label htmlFor="comment" className="text-sm font-medium">
            Share your thoughts about {name}
          </label>
          <textarea
            id="comment"
            placeholder="What do you think about this character? Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] resize-none focus:ring-primary/20 border border-gray-300 rounded-md px-4 py-3 text-base text-gray-700 w-full"
            disabled={isSubmitting}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground">
              {comment.length}/280 characters
            </span>
            <button
              data-testid="button-submit-comment"
              onClick={handleSubmitComment}
              disabled={disableButtomSubmit}
              className={`gap-2 bg-primary-700 rounded-md py-2 text-primary-100 px-4 flex items-center justify-center ${
                disableButtomSubmit ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Post Comment
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-base font-medium mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
          Comments ({characterComments.length})
        </h3>

        <div className="space-y-4">
          {characterComments.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-muted-foreground/60" />
                </div>

                <h4 className="text-lg font-medium mb-2 text-muted-foreground">
                  No comments yet
                </h4>
                <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6">
                  Be the first to share your thoughts about {name}! Your comment
                  could start an interesting discussion.
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full border border-primary-600">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-primary-600">
                    Add the first comment above
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {[...characterComments].reverse().map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-muted/30 rounded-lg border border-muted/50"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-primary-600">
                        {comment.author.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold capitalize ">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
