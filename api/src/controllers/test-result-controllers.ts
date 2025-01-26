//Import tools
import { Test_result_model, ITestResult } from '../models/TestResultsModel';
import {
    Medical_record_model,
    IMedicalRecord,
} from '../models/MedicalRecordModel';
import { client_response, internal_response } from '../utils/responses';
import { add_test_result_id } from './medical-record-controllers';
import { encrypt, decrypt } from '../utils/encrpt';

//Create a new test result
export const create_test_result = async (req: any, res: any) => {
    try {
        const { title, results, medical_record } = req.body;
        const uid = req.uid;

        //Encrypt the results
        const encrypted_results = encrypt(JSON.stringify(results));

        //Create the test result
        const new_test_result: ITestResult = new Test_result_model({
            uid,
            title,
            results: encrypted_results,
        });

        //Save the test result
        await new_test_result.save();

        //Add the test result to the medical record
        await add_test_result_id(medical_record, new_test_result._id);

        return client_response(res, 201, 'Test procesado con éxito', {
            test_result: new_test_result,
        });
    } catch (error) {
        internal_response('Error while creating the test result', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//User get the test results
export const user_get_test_results = async (req: any, res: any) => {
    try {
        const { medical_record } = req.params;

        //Find the medical record
        const medical_record_data: IMedicalRecord | null =
            await Medical_record_model.findOne({ medical_record }).lean();

        if (!medical_record_data)
            return client_response(res, 404, 'Medical record not found');

        //Is the user allowed to see the test results?
        if (medical_record_data.uid !== req.uid)
            return client_response(res, 403, 'No autorizado');

        //Find the test results
        const test_results: ITestResult[] = await Test_result_model.find({
            _id: { $in: medical_record_data.test_results },
        });

        //Decrypt the results
        test_results.forEach((result) => {
            result.results = JSON.parse(decrypt(result.results as string));
        });

        return client_response(res, 200, 'Correcto', {
            test_results,
        });
    } catch (error) {
        internal_response('Error while getting the test results', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Admin get the test results
export const admin_get_test_results = async (req: any, res: any) => {
    try {
        const { medical_record } = req.params;

        //Find the medical record
        const medical_record_data: IMedicalRecord | null =
            await Medical_record_model.findOne({ medical_record }).lean();

        if (!medical_record_data)
            return client_response(res, 404, 'Medical record not found');

        //Find the test results
        const test_results: ITestResult[] = await Test_result_model.find({
            _id: { $in: medical_record_data.test_results },
        });

        //Decrypt the results
        test_results.forEach((result) => {
            result.results = JSON.parse(decrypt(result.results as string));
        });

        return client_response(res, 200, 'Correcto', {
            test_results,
        });
    } catch (error) {
        internal_response('Error while getting the test results', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};
