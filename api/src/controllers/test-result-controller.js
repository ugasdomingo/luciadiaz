import { Test_result } from "../models/Test-result-model.js";
import { client_response } from "../utils/responses.js";
import { encrypt, decrypt } from "../utils/encrypt.js";

export const get_all_test_results = async (req, res, next) => {
    try {
        const test_results = await Test_result.find().populate('user_id').sort({ createdAt: -1 }).lean();

        test_results.forEach((test_result) => {
            test_result.results = decrypt(test_result.results);
        });

        return client_response(res, 200, 'OK', test_results);
    } catch (error) {
        next(error);
    }
}

export const create_test_result = async (req, res, next) => {
    try {
        const { test_name, results } = req.body;
        const user_id = req.user_id;
        //Validate if user did the test before
        const test_result_before = await Test_result.findOne({ user_id, test_name });

        if (test_result_before) {
            const expiresAt = new Date(test_result_before.expiresAt);
            const today = new Date();
            if (expiresAt > today) {
                throw new Error('Debes esperar a que expire el test anterior, para realizarlo nuevamente');
            }
        }
        const encrypted_results = encrypt(JSON.stringify(results));
        const test_result = new Test_result({ user_id, test_name, results: encrypted_results });
        await test_result.save();
        return client_response(res, 201, 'Test creado correctamente');
    } catch (error) {
        next(error);
    }
}



