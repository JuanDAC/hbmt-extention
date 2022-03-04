import { createTitleOfActions, createGlobalAction } from '../application/correctionActions';

export const corrections = () => {
    createTitleOfActions("Apply Review to all:");
    createGlobalAction("Review (100%)");
    createGlobalAction("Second review (65%)");
    createGlobalAction("Last review (50%)");
    createTitleOfActions("Apply visivility to all:");
    createGlobalAction("Mark as skipped", { method: "POST" });
    createGlobalAction("Mark as unskipped", { method: "POST" });
};