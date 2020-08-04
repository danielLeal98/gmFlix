import React, { useState, useEffect } from "react";
import PageDefault from "../../../components/PageDefault";
import { Link, useHistory } from "react-router-dom";
import FormField from "../../../components/FormField";
import videosRepository from "../../../repositories/videos";
import categoriasRepository from "../../../repositories/categorias";
import { ButtonCadastrar, DivButton, H1 } from "../Categoria/styles";
import useForm from "../../../hooks/useForm";
import "../../../components/Menu/Menu.css";

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({});

  useEffect(() => {
    categoriasRepository.getAll().then((categoriasFromServer) => {
      setCategorias(categoriasFromServer);
    });
  }, []);

  return (
    <PageDefault textButton="Nova Categoria" to="/cadastro/categoria">
      <H1>Cadastro de Video {values.titulo}</H1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const categoriaEscolhida = categorias.find(
            (categoria) => categoria.titulo === values.categoria
          );

          videosRepository
            .create({
              titulo: values.titulo,
              url: values.url,
              categoriaId: categoriaEscolhida.id,
              createdAt: new Date(),
            })
            .then(() => {
              alert("Vídeo cadastrado com sucesso em Homologação!");
              history.push("/");
            });
        }}
      >
        <FormField
          label="Título"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <DivButton>
          <Link to="/">
            <img
              src="https://img.icons8.com/cotton/64/000000/circled-left-2.png"
              alt="Back"
            />
          </Link>
          <ButtonCadastrar type="submit">
            <img
              src="https://img.icons8.com/cotton/64/000000/circled-chevron-down.png"
              alt="Save"
            />
          </ButtonCadastrar>
        </DivButton>
      </form>
    </PageDefault>
  );
}
export default CadastroVideo;
