"use client";

import * as React from "react";
import { AlarmClock, ClipboardCheck, Languages, ListCollapse, PenLine } from "lucide-react";
import { Compose, type ComposeMention, type ComposeCommand } from "@/components/ui/compose";

const AVATAR_BG = "e8b84b,4c8c9b,c0532f,8e7cc3,3f7f6f,d98b8b";
const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(
    seed,
  )}&backgroundColor=${AVATAR_BG}&backgroundType=solid&radius=50&scale=115`;

const MENTIONS: ComposeMention[] = [
  { id: "laziedev", label: "laziedev", sublabel: "you · founder", avatar: avatarUrl("laziedev") },
  { id: "shiawase", label: "shiawase", sublabel: "design", avatar: avatarUrl("shiawase22") },
  { id: "khushi", label: "khushi", sublabel: "engineering", avatar: avatarUrl("khushi") },
];

const iconProps = { strokeWidth: 1.6 };

const COMMANDS: ComposeCommand[] = [
  { id: "summarize", label: "summarize", hint: "Condense the thread", icon: <ListCollapse {...iconProps} /> },
  { id: "rewrite", label: "rewrite", hint: "Improve tone & clarity", icon: <PenLine {...iconProps} /> },
  { id: "translate", label: "translate", hint: "To another language", icon: <Languages {...iconProps} /> },
  { id: "todo", label: "todo", hint: "Create a task", icon: <ClipboardCheck {...iconProps} /> },
  { id: "remind", label: "remind", hint: "Set a reminder", icon: <AlarmClock {...iconProps} /> },
];

export default function ComposeDemo() {
  const [sent, setSent] = React.useState<string[]>([]);

  return (
    <div className="flex min-h-[560px] w-full items-center justify-center bg-zinc-50 p-6 dark:bg-zinc-950">
      <div className="w-full max-w-[540px]">
        {sent.length > 0 && (
          <div className="mb-4 space-y-2">
            {sent.map((m, i) => (
              <div
                key={i}
                className="ml-auto max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-zinc-900 px-3.5 py-2 text-[14px] text-white dark:bg-white dark:text-zinc-900"
              >
                {m}
              </div>
            ))}
          </div>
        )}
        <Compose
          mentions={MENTIONS}
          commands={COMMANDS}
          maxLength={500}
          defaultValue="Kicking off the redesign - @shiawase can you /summarize the thread for @khushi?"
          placeholder="Message your team…  press @ to mention, / for commands"
          onSubmit={(v) => setSent((s) => [...s, v])}
          onCommand={(c) => console.log("command:", c.label)}
          aria-label="Team message"
        />
      </div>
    </div>
  );
}
