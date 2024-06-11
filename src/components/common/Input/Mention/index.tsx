import { selectSignedUser } from "@/redux/features/accountSlice";
import { useAppSelector } from "@/redux/hooks";
import { User } from "@/services/type";
import { userService } from "@/services/user.service";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";

import { useMemo, useState } from "react";
import PostMention from "../../Post/PostMention";

const Mention = ({
  label,
  mentionData,
  onChangeMentionData,
  deleteMentionData,
}: {
  label?: string;
  mentionData: User[];
  onChangeMentionData: (value: User) => void;
  deleteMentionData: () => void;
}) => {
  const signedUser = useAppSelector(selectSignedUser);

  const { data } = useQuery<User[]>({
    queryKey: ["all_users"],
    queryFn: async () => {
      const res = await userService.getAll();
      return res;
    },
  });

  const dataExceptSignedUser = useMemo(() => {
    return data ? data.filter((user) => user?.uid !== signedUser?.uid) : [];
  }, [data, signedUser?.uid]);

  const [query, setQuery] = useState<string>("");

  const filteredPeople = dataExceptSignedUser
    ? query === ""
      ? dataExceptSignedUser
      : dataExceptSignedUser?.filter((person) => {
          return person.username.toLowerCase().includes(query.toLowerCase());
        })
    : [];
  return (
    <Combobox
      onChange={(value: User) => {
        onChangeMentionData(value);
      }}
    >
      <div>
        {label && (
          <p className="text-sm font-normal text-dark-gray w-full ">{label}</p>
        )}
        {mentionData.length > 0 && (
          <div className="flex items-center justify-between">
            <PostMention
              mentionData={mentionData?.map(
                (item) => item?.email?.split("@")[0] ?? ""
              )}
            />

            <button
              className="text-sm font-normal text-dark-gray"
              onClick={deleteMentionData}
            >
              Xóa tất cả
            </button>
          </div>
        )}
      </div>
      <div className="relative flex items-stretch w-full overflow-hidden rounded-lg  border border-light-gray">
        <ComboboxInput
          className={
            "outline-none flex-1 z-10  px-4 py-2 text-base bg-transparent font-medium text-black "
          }
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 px-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="top"
        className="w-[var(--input-width)] rounded-xl bg-white border p-1 [--anchor-gap:var(--spacing-1)] empty:hidden !max-h-[400px]"
      >
        {filteredPeople.map((person, index) => (
          <ComboboxOption
            key={index}
            value={person}
            className="flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none text-black data-[focus]:bg-blue/10 data-[focus]:text-blue"
          >
            <img
              src={person.avatar}
              className="h-6 w-6 rounded-full object-cover border"
            />
            <p className="text-sm py-2 flex-1  truncate">{person.username}</p>
            {mentionData?.find((item) => item?.uid === person?.uid) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1da1f2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default Mention;
