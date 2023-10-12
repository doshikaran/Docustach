import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface ChatInputProps {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  return (
    <div className="  absolute bottom-0 left-0 w-full">
      <form className=" mx-3 flex flex-row gap-3 md:mx-6 md:last:mb-6 lg:mx-auto lg:mx-w-2xl xl:max-w-3xl">
        <div className=" relative flex h-full flex-1 items-stretch md:flex-col">
          <div className=" relative flex flex-col w-full flex-grow p-5">
            <div className=" relative">
              <Textarea
                autoFocus
                maxRows={3}
                rows={1}
                className=" resize-none pr-10 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrollbar-touch"
                placeholder=" Send your message"
              />
              <Button 
              className=" absolute bottom-1.5 right-2"
              aria-label="send message">
                <Send className=" h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
