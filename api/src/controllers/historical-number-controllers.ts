//Import tools
import { Historical_model, INumber } from '../models/HistoricalNumberModel';
import { internal_response, client_response } from '../utils/responses';

//Define the controller
export const get_historical_number = async (res: any) => {
    try {
        const historical_number: INumber | null =
            await Historical_model.findOne();
        return historical_number?.last_historical_number;
    } catch (error) {
        internal_response('Error while getting the historical number', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

export const update_historical_number = async (number: number, res: any) => {
    try {
        await Historical_model.updateOne(
            {},
            { last_historical_number: number }
        );
    } catch (error) {
        internal_response('Error while updating the historical number', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};
