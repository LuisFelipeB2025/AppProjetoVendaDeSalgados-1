import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import ProdutoCard from '../components/ProdutoCard';

type Produto = {
  id: string;
  nome: string;
  preco: number;
};

const produtos: Produto[] = [
  { id: '1', nome: 'Coxinha', preco: 5 },
  { id: '2', nome: 'Empada', preco: 4 },
  { id: '3', nome: 'Pastel', preco: 6 },
];

export default function HomeScreen() {
  const [quantidades, setQuantidades] = useState<Record<string, number>>({});

  const handleQuantidade = (id: string, valor: number) => {
    setQuantidades({ ...quantidades, [id]: valor });
  };

  const enviarPedido = () => {
    let mensagem = 'Pedido de salgados:\n';
    produtos.forEach(produto => {
      const qtd = quantidades[produto.id] || 0;
      if (qtd > 0) {
        mensagem += `${produto.nome}: ${qtd} x R$${produto.preco} = R$${qtd * produto.preco}\n`;
      }
    });

    const numeroWhatsApp = '5521969714096'; // Coloque o número do fornecedor
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cardápio de Salgados</Text>
      <FlatList
        data={produtos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProdutoCard
            produto={item}
            quantidade={quantidades[item.id] || 0}
            setQuantidade={handleQuantidade}
          />
        )}
      />
      <TouchableOpacity style={styles.botao} onPress={enviarPedido}>
        <Text style={styles.botaoTexto}>Enviar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  botao: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
