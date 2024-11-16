// Logger.js
export const Logger = {
    isOn: true,
    levels: {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    },
    currentLevel: 0, // Set to DEBUG level by default

    PRINT(message, level = 1) {
        if (this.isOn && level >= this.currentLevel) {
            const timestamp = "[" + new Date().toLocaleTimeString() + "] ";
            const levelStr = {
                [this.levels.DEBUG]: '[DEBUG] ',
                [this.levels.INFO]: '[INFO] ',
                [this.levels.WARN]: '[WARN] ',
                [this.levels.ERROR]: '[ERROR] ',
            }[level] || '';
            const processedMessage = timestamp + levelStr + message;
            console.log(processedMessage);
        }
    },

    DEBUG(message) {
        this.PRINT(message, this.levels.DEBUG);
    },

    INFO(message) {
        this.PRINT(message, this.levels.INFO);
    },

    WARN(message) {
        this.PRINT(message, this.levels.WARN);
    },

    ERROR(message) {
        this.PRINT(message, this.levels.ERROR);
    }
};
