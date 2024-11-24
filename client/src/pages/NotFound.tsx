import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      gap={2}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Oh, que pena! Não encontramos o que estava procurando! 😥
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{
          textTransform: "none",
          backgroundColor: "slategray",
          ":hover": {
            backgroundColor: "gray",
          },
        }}
      >
        Voltar
      </Button>
    </Box>
  );
}

export default NotFound;
