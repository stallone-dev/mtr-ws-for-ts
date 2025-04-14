export interface ConsultarMtrResponseDTO {
    manNumero: string;
    manData: number;
    manNomeMotorista: string;
    manPlacaVeiculo: string;
}

export interface GeradorResponseDTO {
    manNumero: string;
    mensagem: string;
}

export interface DestinadorResponseDTO {
    manNumero: string;
    status: string;
}
