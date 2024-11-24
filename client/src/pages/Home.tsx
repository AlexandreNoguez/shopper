import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { LinkedinLogo } from "@phosphor-icons/react";

function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Fade>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" component="h1">
            Olá, meu nome é <strong>Alexandre Noguez!</strong>
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ textAlign: "justify", lineHeight: 1.8 }}
          >
            Este projeto foi criado com o objetivo de demonstrar minhas
            habilidades para a vaga de <strong>Desenvolvedor Fullstack</strong>{" "}
            na <strong>Shopper</strong>. Nele, desenvolvi uma busca de viagens
            utilizando tecnologias como <strong>React</strong>,{" "}
            <strong>Redux</strong> e consumindo a API do Google, a{" "}
            <a
              href="https://developers.google.com/maps/documentation/routes?hl=pt_BR"
              target="_blank"
            >
              Google API Routes
            </a>
            .
          </Typography>

          <Typography
            variant="body2"
            sx={{ textAlign: "justify", lineHeight: 1.6 }}
          >
            Estou sempre em busca de melhorar minhas habilidades e criar
            soluções de impacto. Caso tenha sugestões ou queira conhecer mais
            sobre meu trabalho, sinta-se à vontade para entrar em contato
            comigo.
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Button
              variant="contained"
              color="primary"
              href="https://www.linkedin.com/in/alexandre-noguez/"
              target="_blank"
              startIcon={<LinkedinLogo />}
              sx={{ textTransform: "none" }}
            >
              Meu LinkedIn
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href="mailto:alexandre@example.com"
              sx={{ textTransform: "none" }}
            >
              Enviar Email
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}

export default Home;
