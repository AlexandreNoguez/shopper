import React, { useState, FormEvent, ChangeEvent } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { loginUser } from "../redux/user/actions";
import { saveUser } from "../services/userService";
import { generateRandomString } from "../helpers/formatString";

interface PokemonTrainerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LoginModal: React.FC<PokemonTrainerModalProps> = ({ open, setOpen }) => {
  const [userName, setUserName] = useState<string>("");
  const dispatch = useDispatch();

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userName) {
      toast.warning("O campo não pode estar em branco");
      return;
    }
    const id = generateRandomString();
    saveUser({ id, name: userName });

    dispatch(loginUser({ id, userName }));
    setOpen(false);
    setUserName("");
  };

  const handleClose = () => {
    setOpen(false);
    setUserName("");
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle textAlign={"center"}>Olá! Você quer viajar?</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSignIn}>
          <TextField
            label="Digite seu nome"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={
            handleSignIn as unknown as React.MouseEventHandler<HTMLButtonElement>
          }
          color="primary"
          variant="contained"
          type="submit"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
