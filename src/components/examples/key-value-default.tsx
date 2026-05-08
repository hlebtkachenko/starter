/**
 * @slug key-value
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/key-value
 * @deviations ["Token classes replace hardcoded palette."]
 */

import {
  KeyValue,
  KeyValueAdd,
  KeyValueItem,
  KeyValueKeyInput,
  KeyValueList,
  KeyValueRemove,
  KeyValueValueInput,
} from "@/components/ui/key-value";

export default function KeyValueDefault() {
  return (
    <KeyValue
      defaultValue={[
        { id: "1", key: "API_URL", value: "https://api.example.com" },
        { id: "2", key: "APP_ENV", value: "production" },
        { id: "3", key: "LOG_LEVEL", value: "info" },
      ]}
      className="w-full max-w-lg"
    >
      <KeyValueList>
        <KeyValueItem>
          <KeyValueKeyInput />
          <KeyValueValueInput />
          <KeyValueRemove />
        </KeyValueItem>
      </KeyValueList>
      <KeyValueAdd />
    </KeyValue>
  );
}
