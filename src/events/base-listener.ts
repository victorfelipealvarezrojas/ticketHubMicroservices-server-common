import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
    subject: Subjects;
    data: any;
}

//Cuando extendamos este oyente, nos aseguraremos de proporcionar un tipo de evento como el tipo genérico
export abstract class Listener<T extends Event> {
    //abstract son los metodos de implementacion
    abstract subject: T['subject'];//tema
    abstract queueGropuName:string;//queremos escuchar en ese nombre de grupo IQ del servidor de cadenas  
    //vla función on message, la función on message es lo que realmente va a recibir
    abstract onMessage(data : T['data'], msg: Message): void;//funcion que marcara el proceso de recepcion del evento como finalizado
    protected client: Stan;
    protected ackWait = 5 * 1000;

    //a la instancia de esta clase se le proporciona un cliente NATS 
    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()//obtenga todos mensajes en este canal que alguna vez se han emitido.
            .setManualAckMode(true)
            .setAckWait(this.ackWait)//tiempo de espera
            .setDurableName(this.queueGropuName)
    }

    //metodo de escucha y es aqui donde se configura la subscripcion
    //Eso nos dará nuestra suscripción después de que la obtengamos
    //Esto es lo que realmente le va a decir al cliente que comience a suscribirse o crear una suscripción
    listen() {
        //me subscribo al evento "ticket:created"
        const subscription = this.client.subscribe(
            this.subject,//indica el evento al cual me estoy vinculando
            this.queueGropuName,//el nombre que recibira este grupo en el receptor
            this.subscriptionOptions()//conjunto de opciones que utilizara el listener
        )

        //activo la suscripcion y obtengo mensaje 
        //cada vez que recibimos un mensaje, es cuando realmente íbamos a llamar a la función de mensaje en parseMessage
        subscription.on('message', (msg: Message) => {
            console.log(
                `Message received: ${this.subject} / ${this.queueGropuName}`
            );
            const parseData = this.parseMessage(msg);
            this.onMessage(parseData, msg);
        })
    }

    parseMessage(msg: Message) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'));//bufer
    }
}