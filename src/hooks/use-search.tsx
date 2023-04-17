import { useForm, UseFormRegister, UseFormReturn } from "react-hook-form";
import { createContext, useContext } from "react";

export interface SearchFormValues {
  title: string | undefined;
  completed: "all" | "true" | "false" | undefined;
}

type UseSearch = () => {
  register: UseFormRegister<SearchFormValues>;
  byTitle: string | undefined;
  byCompletion: string | undefined;
};

const SearchContext = createContext({
  register: undefined,
  byTitle: undefined,
  byCompletion: undefined,
});

export const SearchProvider = ({ children }) => {
  const { register, watch } = useForm<SearchFormValues>();

  const byTitle = watch("title");

  const byCompletion = watch("completed");

  return (
    <SearchContext.Provider value={{ register, byTitle, byCompletion }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch: UseSearch = () => {
  const ctx = useContext(SearchContext);
  return ctx;
};
