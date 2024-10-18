import { createLogger, transports, format } from'winston';
import path from'path';

// Define the custom settings for each transport (file, console)
const logger = createLogger({
    level: 'info', // Default logging level
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp to logs
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({ 
            filename: path.join(__dirname, '../logs/error.log'), 
            level: 'error',  // Only log errors to this file
        }),
        new transports.File({ 
            filename: path.join(__dirname, '../logs/combined.log'), 
        }),
        new transports.Console({
            format: format.combine(
                format.colorize(),  // Colorize console logs for better visibility
                format.simple()  // Simple output for console
            ),
        }),
    ],
});

// If we're not in production, log to the console with more verbose output
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

export default logger;
