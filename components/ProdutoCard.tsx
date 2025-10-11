import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Produto = {
  id: string;
  nome: string;
  preco: number;
};

type Props = {
  produto: Produto;
  quantidade: number;
  setQuantidade: (id: string, valor: number) => void;
};

export default function ProdutoCard({ produto, quantidade, setQuantidade }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>R$ {produto.preco}</Text>
      <View style={styles.controle}>
        <TouchableOpacity
          style={styles.botaoControle}
          onPress={() => setQuantidade(produto.id, quantidade > 0 ? quantidade - 1 : 0)}
        >
          <Text style={styles.botaoTexto}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantidade}>{quantidade}</Text>
        <TouchableOpacity
          style={styles.botaoControle}
          onPress={() => setQuantidade(produto.id, quantidade + 1)}
        >
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, borderWidth: 1, borderColor: '#ccc', marginBottom: 10, borderRadius: 8 },
  nome: { fontSize: 18 },
  preco: { fontSize: 16, color: '#555', marginBottom: 10 },
  controle: { flexDirection: 'row', alignItems: 'center' },
  botaoControle: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 5, width: 40, alignItems: 'center' },
  botaoTexto: { fontSize: 18 },
  quantidade: { fontSize: 16, marginHorizontal: 10 },
});
