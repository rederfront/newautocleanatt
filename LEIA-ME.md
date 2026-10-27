# Landing page AutoClean Joinville

Site estático (HTML, CSS e JavaScript puros, sem dependências). Para publicar, envie a pasta inteira para a hospedagem, mantendo `index.html` na raiz.

## Estrutura

- `index.html`: conteúdo de todas as seções
- `css/style.css`: visual (cores no topo do arquivo, em `:root`)
- `js/main.js`: menu, abas de serviços, ampliar fotos e formulário de orçamento
- `assets/`: logotipo oficial (extraído do catálogo), as 4 fotos e o favicon

## O que conferir antes de publicar

1. **Mapa (seção Localização).** O PDF e os materiais não trazem o endereço. O mapa usa a busca "AutoClean Joinville SC", que o Google resolve pelo nome. Confirme que o pino cai no lugar certo. Se não cair, troque `AutoClean+Joinville+SC` pelo endereço completo em três pontos do `index.html`: o `src` do `<iframe>`, o botão "Como chegar" e o link "Ver avaliações no Google Maps".
2. **WhatsApp.** O número (47) 99267-6589 vem dos links do catálogo e aparece em vários pontos do `index.html` e no `js/main.js` (`WA_NUMBER`). Para trocar, substitua `5547992676589` nos dois arquivos.
3. **Fontes.** Barlow Condensed e Archivo são carregadas do Google Fonts. Se ficarem indisponíveis, o site usa fontes do sistema.

## Regras que o site segue

- Nenhum preço aparece em lugar nenhum. Os valores do catálogo não foram copiados.
- Os serviços do catálogo estão na página, agrupados por linha (a linha de películas foi retirada a pedido do cliente).
- Avaliações (nota 4,9 e 85 avaliações) são os números informados pela empresa, não são lidos em tempo real.
