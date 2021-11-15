//corresponden a los cuatro estados posibles que un pedido puede tener
export enum OrderStatus {
    //cuando la orden fue creada, pero el boleto que intenta ordenar no ha sido reservado
    Created = 'created',
    //pedido estará en el estado de cancelado en cualquier momento , cuando el usuario cancele , si el pedido expira antes del pago.
    Cancelled = 'cancelled',
    //la espera de pago se producirá siempre que el pedido haya reservado con éxito el boleto    
    AwaitingPayment = 'awaiting:payment',
    //se ha completado en cualquier momento, el pedido ha reservado las entradas y el usuario proporcionó el pago correctamente.
    Complete = 'complete'
}