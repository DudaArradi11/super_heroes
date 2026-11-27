
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

export default function Home() {
  const [herois, setHerois] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregaHeroes = async () => {
    try {
      setCarregando(true);
      setErro(null);

      const response = await fetch(
        'https://superheroes-api-one.vercel.app/api/herois'
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar heróis');
      }

      const data = await response.json();
      const lista = Array.isArray(data)
        ? data
        : data?.herois || [];

      setHerois(lista);
    } catch (e) {
      setErro(e.message || 'Erro inesperado');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregaHeroes();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>✦</Text>
        </View>

        <Text style={styles.cardLabel}>HERÓI</Text>
      </View>

      {item.foto ? (
        <Image
          source={{ uri: item.foto }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderIcon}>🦸</Text>
          <Text style={styles.placeholderText}>
            Imagem indisponível
          </Text>
        </View>
      )}

      <Text style={styles.heroName}>
        {item.nome}
      </Text>

      <View style={styles.divider} />

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>FORÇA</Text>
        <Text style={styles.infoText}>
          {item.forca || 'Não informado'}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>HABILIDADES</Text>
        <Text style={styles.infoText}>
          {item.habilidade || 'Não informado'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#071B13"
      />

      <FlatList
        data={herois}
        keyExtractor={(item, index) =>
          String(item.id ?? index)
        }
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>✦</Text>
              <Text style={styles.logo}>HEROES</Text>
            </View>

            <Text style={styles.subtitle}>
              UNIVERSO DOS SUPER-HERÓIS
            </Text>

            <View style={styles.banner}>
              <Text style={styles.bannerTag}>
                DESCUBRA SEU LADO HEROICO
              </Text>

              <Text style={styles.bannerTitle}>
                Lista de Heróis
              </Text>

              <Text style={styles.bannerDescription}>
                Conheça os personagens, suas forças
                e habilidades extraordinárias.
              </Text>

              <View style={styles.counter}>
                <Text style={styles.counterText}>
                  {herois.length} heróis encontrados
                </Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          carregando ? (
            <View style={styles.statusContainer}>
              <ActivityIndicator
                size="large"
                color="#A3E635"
              />
              <Text style={styles.statusText}>
                Carregando heróis...
              </Text>
            </View>
          ) : (
            <View style={styles.statusContainer}>
              <Text style={styles.statusIcon}>🦸</Text>
              <Text style={styles.statusTitle}>
                Nenhum herói encontrado
              </Text>
              <Text style={styles.statusText}>
                Não encontramos heróis para exibir.
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          !carregando && !erro ? (
            <Text style={styles.footer}>
              CADA HERÓI TEM UMA HISTÓRIA
            </Text>
          ) : null
        }
      />

      {erro && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Erro: {erro}
          </Text>
          <Text
            style={styles.retryText}
            onPress={carregaHeroes}
          >
            Tentar novamente
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B13',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  header: {
    paddingTop: 55,
    paddingBottom: 24,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  logoIcon: {
    color: '#A3E635',
    fontSize: 28,
  },

  logo: {
    color: '#F0FDF4',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 5,
  },

  subtitle: {
    color: '#86A897',
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 3,
    marginTop: 8,
  },

  banner: {
    backgroundColor: '#102C20',
    borderRadius: 22,
    padding: 22,
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#244A34',
  },

  bannerTag: {
    color: '#A3E635',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },

  bannerTitle: {
    color: '#F0FDF4',
    fontSize: 27,
    fontWeight: '900',
    marginTop: 12,
  },

  bannerDescription: {
    color: '#B1C9B9',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 8,
  },

  counter: {
    alignSelf: 'flex-start',
    backgroundColor: '#1B3D2B',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 18,
  },

  counterText: {
    color: '#A3E635',
    fontSize: 11,
    fontWeight: 'bold',
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  card: {
    width: '48%',
    backgroundColor: '#102C20',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#244A34',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },

  iconContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#294A32',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: '#A3E635',
    fontSize: 14,
  },

  cardLabel: {
    color: '#86A897',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },

  heroImage: {
    width: '100%',
    height: 145,
    borderRadius: 12,
    backgroundColor: '#1B3D2B',
  },

  imagePlaceholder: {
    width: '100%',
    height: 145,
    borderRadius: 12,
    backgroundColor: '#1B3D2B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderIcon: {
    fontSize: 35,
  },

  placeholderText: {
    color: '#86A897',
    fontSize: 10,
    marginTop: 8,
  },

  heroName: {
    color: '#F0FDF4',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 14,
    minHeight: 38,
  },

  divider: {
    height: 1,
    backgroundColor: '#294A32',
    marginVertical: 12,
  },

  infoContainer: {
    marginBottom: 12,
  },

  infoLabel: {
    color: '#A3E635',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 5,
  },

  infoText: {
    color: '#B1C9B9',
    fontSize: 12,
    lineHeight: 18,
  },

  statusContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },

  statusIcon: {
    fontSize: 40,
    marginBottom: 12,
  },

  statusTitle: {
    color: '#F0FDF4',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  statusText: {
    color: '#86A897',
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
  },

  errorContainer: {
    backgroundColor: '#3B1818',
    borderWidth: 1,
    borderColor: '#7F2929',
    borderRadius: 14,
    padding: 18,
    margin: 16,
  },

  errorText: {
    color: '#FCA5A5',
    fontSize: 13,
  },

  retryText: {
    color: '#A3E635',
    fontWeight: 'bold',
    marginTop: 12,
  },

  footer: {
    color: '#567565',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    marginTop: 20,
  },
});
