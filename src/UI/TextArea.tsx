import { Textarea } from "@/components/ui/textarea";
export function TextareaUi({
  onChange,
  value,
  disabled,
  placeholder,
}: {
  onChange: (note: string) => void;
  value: string | undefined;
  disabled: boolean;
  placeholder: string;
}) {
  return (
    <Textarea
      className="focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ffcb05]"
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
}
