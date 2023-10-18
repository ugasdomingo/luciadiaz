//Import tools
import { Request, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';
import { TestResult, ITestResult } from '../models/TestResult';

// Create --> Line 14
// getAllTestResultsByUserId --> Line 37
// Delete --> Line 75

//Create
export const createTestResult = async (req: IRequest, res: Response) => {
    const { answers, testTitle } = req.body;

    try {
        //Create test result
        const testResult: ITestResult = new TestResult({
            uid: req.uid,
            answers,
            testTitle,
        });

        await testResult.save();

        return res.status(201).json({
            msg: 'Resultado creado',
            testResult,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al crear el resultado',
        });
    }
};

//getAllTestResultsByUserId
export const getAllTestResultsByUserId = async (
    req: Request,
    res: Response
) => {
    try {
        const testResults: ITestResult[] = await TestResult.find({
            uid: req.params.uid,
        });

        return res.status(200).json({
            testResults,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al obtener los resultados',
        });
    }
};

//Delete
export const deleteTestResult = async (req: Request, res: Response) => {
    try {
        await TestResult.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            msg: 'Resultado eliminado',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al eliminar el resultado',
        });
    }
};
