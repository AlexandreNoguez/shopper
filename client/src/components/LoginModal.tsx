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

interface PokemonTrainerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PokemonTrainerModal: React.FC<PokemonTrainerModalProps> = ({
  open,
  setOpen,
}) => {
  const [loggedUser, setLoggedUser] = useState<string>("");
  const dispatch = useDispatch();

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loggedUser) {
      toast.warning("O campo não pode estar em branco");
      return;
    }

    dispatch(loginUser(loggedUser));
    setOpen(false);
    setLoggedUser("");
  };

  const handleClose = () => {
    setOpen(false);
    setLoggedUser("");
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
            value={loggedUser}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLoggedUser(e.target.value)
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

export default PokemonTrainerModal;
