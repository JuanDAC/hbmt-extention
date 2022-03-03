import { createTitleOfActions, createGlobalAction } from '../application/correctionActions';

export const corrections = () => {
    createTitleOfActions();
    createGlobalAction("Review (100%)");
    /* createGlobalAction("Mark as skipped"); */
};