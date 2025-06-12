export default interface AppContextProps {
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
