import React, { useCallback, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

interface Conversation {
  role: string;
  content: string;
}

export default function ChatBot() {
  const [value, setValue] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await sendMessage();
    }
  };

  const sendMessage = async () => {
    setIsTyping(true);
    const chatHistory = [...conversation, { role: "user", content: value }];
    const response = await fetch("/api/openAIChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: chatHistory }),
    });

    const data = await response.json();
    setValue("");
    setConversation([
      ...chatHistory,
      { role: "assistant", content: data.result.choices[0].message.content },
    ]);
    setIsTyping(false);
  };

  return (
    <div>
      <div className="fixed top-16 w-full max-w-sm px-4">
        <Popover className="relative">
          <Popover.Button>
            <span className='bg-green-500 text-white rounded-full p-4 shadow-lg fixed bottom-10 right-10'>
              <span className="h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                </svg>
              </span>
            </span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="fixed bottom-4 right-4 md:bottom-10 md:right-10">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="bg-gray-100 flex flex-col justify-between">

                  <div className="bg-white rounded-full m-2">
                    <div className="flex justify-between items-center px-2">
                      <Image
                        src="/ico/ico.png"
                        width={54}
                        height={54}
                        alt="robot"
                      />
                      <span className="font-bold text-green-500">
                        Bamboo Express
                      </span>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500">Online</span>
                        <span className="ml-2 text-xs text-green-500">●</span>

                      </div>
                    </div>
                  </div>

                  <div className="px-3 mt-3 overflow-y-scroll h-80 w-96">
                    <div className="bg-green-300 p-2 rounded-lg w-4/5 ml-auto mb-3">
                      Hola, soy Bamboo Express, tu asistente virtual. ¿En qué puedo ayudarte?
                    </div>
                    {conversation.map((item, index) => (
                      <div key={index}>
                        {item.role === "assistant" ? (
                          <div className="bg-green-300 p-2 rounded-lg w-4/5 ml-auto mb-3">
                            {item.content}
                          </div>
                        ) : (
                          <div className="bg-white p-2 rounded-lg w-4/5 mb-3">
                            {item.content}
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="bg-white p-2 rounded-lg w-4/5 mb-3">
                        Escribiendo...
                      </div>
                    )}
                  </div>

                  <div className="mt-4 bg-white p-3 flex justify-between">
                    <input
                      type="text"
                      className="w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding mr-2 px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                      placeholder="Escribe tu mensaje"
                      value={value}
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      type="button"
                      className="rounded-md border border-transparent bg-green-100 px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={sendMessage}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  )
}
