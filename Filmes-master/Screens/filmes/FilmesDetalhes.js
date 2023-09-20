import React, { useEffect, useState } from 'react';
import { Card, Text } from 'react-native-paper';
import apiFilmes from '../../services/apiFilmes';
import { View, Image, StyleSheet } from 'react-native';

const FilmesDetalhes = ({ route }) => {
  const [filme, setFilme] = useState({});
  const [atores, setAtores] = useState([]);

  useEffect(() => {
    const id = route.params.id;

    // Carregue os detalhes do filme com base no ID
    apiFilmes.get(`/movie/${id}?language=pt-BR`).then(resultado => {
      setFilme(resultado.data);
    });

    // Carregue a lista de elenco do filme com base no ID
    apiFilmes.get(`/movie/${id}/credits`).then(resultado => {
      setAtores(resultado.data.cast);
    });
  }, [route.params.id]);

  return (
    <>
      <Card>
        <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500/' + filme.backdrop_path }} />
        <Card.Content>
          <Text variant="titleLarge">{filme.title}</Text>
          <Text variant="bodyMedium">{filme.overview}</Text>
        </Card.Content>
      </Card>

      <View style={{ marginTop: 16 }}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Informações Adicionais</Text>
            <Text>Orçamento: {filme.budget}</Text>
            <Text>Valor: {filme.revenue}</Text>
            <Text>Duração: {filme.runtime} minutos</Text>
            <Text>Data de Lançamento: {filme.release_date}</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={{ marginTop: 16 }}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Elenco</Text>
            {atores.map(ator => (
              <Card key={ator.id} style={styles.atorCard}>
                <Image
                  source={{ uri: 'https://image.tmdb.org/t/p/w185/' + ator.profile_path }}
                  style={styles.atorImagem}
                />
                <Card.Content>
                  <Text>{ator.name}</Text>
                </Card.Content>
              </Card>
            ))}
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  atorCard: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  atorImagem: {
    width: 100,
    height: 100, // Defina a altura igual à largura para obter uma imagem circular
    borderRadius: 50, // Define o borderRadius para tornar a imagem circular
  },
});

export default FilmesDetalhes;
