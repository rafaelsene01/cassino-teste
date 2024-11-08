"use client";
import { CurrencyInput } from "react-currency-mask";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const gerarCor = (zero = false) => {
    const value = zero
      ? Math.floor(Math.random() * 36)
      : Math.floor(Math.random() * 2) + 1;
    if (zero && value === 0) return ["verde", 0];
    return [value % 2 ? "preto" : "vermelho", value];
  };
  // const mudarCorSeguencia = (i) => {
  //   setASeguencia(
  //     aSeguencia.map(([cor, val], index) =>
  //       index === i
  //         ? cor === "preto"
  //           ? ["vermelhor", 1]
  //           : ["preto", 2]
  //         : [cor, val]
  //     )
  //   );
  // };

  const caixaInicial = 40000;
  const [caixa, setCaixa] = useState(caixaInicial);
  const [caixaFinal, setCaixaFinal] = useState(caixaInicial);
  const [rodadas, setRodadas] = useState(0);
  // const [aguardar, setAguardar] = useState(false);
  const [aSeguencia, setASeguencia] = useState([
    gerarCor(),
    gerarCor(),
    gerarCor(),
  ]);
  const [cassino] = useState([
    gerarCor(true),
    gerarCor(true),
    gerarCor(true),
    gerarCor(true),
    gerarCor(true),
    gerarCor(true),
    gerarCor(true),
    gerarCor(true),
    gerarCor(true),
    gerarCor(true),
    gerarCor(true),
    gerarCor(true),
  ]);
  const [gabarito, setGabarito] = useState([
    gerarCor(),
    gerarCor(),
    gerarCor(),
    gerarCor(),
    gerarCor(),
    gerarCor(),
    gerarCor(),
    gerarCor(),
    gerarCor(),
    gerarCor(),
    gerarCor(),
    gerarCor(),
    gerarCor(),
    gerarCor(),
  ]);
  const [perdeu, setPerdeu] = useState(false);

  const valoresApostas = [
    2.5, 5, 10, 20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 10240, 20480,
  ];
  const [indexAposta, setIndexAposta] = useState(0);

  const fazerJogada = () => {
    if (caixaFinal < valoresApostas[indexAposta]) return setPerdeu(true);

    setRodadas((r) => r + 1);
    cassino.shift();
    const numeroSorteado = gerarCor(true);
    cassino.push(numeroSorteado);

    const ganhou = numeroSorteado[0] === gabarito[indexAposta][0];
    if (!ganhou) {
      setCaixaFinal((r) => r - valoresApostas[indexAposta]);
      if (indexAposta < 14) setIndexAposta((r) => r + 1);
      else setIndexAposta(0);
    } else {
      setCaixaFinal((r) => r + valoresApostas[indexAposta]);
      setIndexAposta(0);
      setGabarito([
        gerarCor(),
        gerarCor(),
        gerarCor(),
        gerarCor(),
        gerarCor(),
        gerarCor(),
        gerarCor(),
        gerarCor(),
        gerarCor(),
        gerarCor(),
        gerarCor(),
        gerarCor(),
        gerarCor(),
        gerarCor(),
      ]);
    }
  };

  const formatarNumero = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rounded border p-4 w-9/12 grid md:grid-cols-2 grid-cols-1 gap-4">
        <CurrencyInput
          value={caixa}
          onChangeValue={(event, originalValue, maskedValue) => {
            setCaixa(originalValue);
            setCaixaFinal(originalValue);
          }}
          InputElement={<TextField label="Caixa Inicial" size="small" />}
        />
        {/* <div className="flex items-center">
          <FormControlLabel
            control={
              <Checkbox
                checked={aguardar}
                onChange={(e) => setAguardar(e.target.checked)}
                size="medium"
              />
            }
            label="Aguardar Seguencia"
            className="mr-4"
          />
          {aSeguencia.map(([cor], i) => {
            return (
              <div
                key={i}
                className={`${
                  cor === "preto" ? "bg-black" : "bg-red-600"
                } border h-full px-6 flex items-center cursor-pointer mr-2 rounded`}
                onClick={() => mudarCorSeguencia(i)}
              ></div>
            );
          })}
        </div> */}
        <div className="flex flex-col text-center justify-center col-span-2 mb-4 text-xl">
          Historico das jogadas
          <div className="flex justify-center h-10">
            {cassino.map(([cor, numero], i) => {
              return (
                <div
                  key={i}
                  className={`${
                    cor === "verde"
                      ? "bg-green-600 text-white"
                      : cor === "preto"
                      ? "bg-black text-white"
                      : "bg-red-600 text-black"
                  } border h-full px-6 flex items-center mr-2 font-bold rounded`}
                >
                  {numero}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col text-center justify-center col-span-2 mb-4 text-xl">
          Gabarito
          <div className="flex justify-center h-10">
            {gabarito.map(([cor], i) => {
              return (
                <div
                  key={i}
                  className={`${
                    cor === "preto"
                      ? "bg-black text-white"
                      : "bg-red-600 text-black"
                  } ${
                    i === indexAposta && "ring-4 ring-green-600"
                  } border h-full px-6 flex items-center mr-2 font-bold rounded`}
                ></div>
              );
            })}
          </div>
          Valor da aposta: {formatarNumero(valoresApostas[indexAposta])}
        </div>

        <TextField
          label="Rodadas"
          size="small"
          value={rodadas}
          InputLabelProps={{ shrink: true }}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <CurrencyInput
          value={caixaFinal}
          onChangeValue={(event, originalValue, maskedValue) => {
            setCaixa(originalValue);
          }}
          InputElement={<TextField label="Caixa Final" size="small" />}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />

        <div className="col-span-2">
          <Button variant="contained" onClick={() => fazerJogada()}>
            Jogar
          </Button>
        </div>
        {perdeu && `Quebou apos ${rodadas} rodadas`}
      </div>
    </div>
  );
}
