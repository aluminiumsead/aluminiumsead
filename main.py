#!/usr/bin/env python3
"""
Telegram Bot for Aluminum Manufacturing Business
Integrates with mini web application for product showcase
"""

import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes
import asyncio

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Bot configuration
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '7877656985:AAEbB4rLBW1tbJ7fElE0xe8q75EY1W95RPA')
WEB_APP_URL = os.getenv('WEB_APP_URL', 'https://aluminiumsead.github.io/aluminiumsead')

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    Handle /start command - Show welcome message with mini web app button
    """
    try:
        welcome_message = """🔥 به ربات شرکت آلومینیوم ایران خوش آمدید! 🔥

🏭 **ما متخصص در:**
• خرید و فروش ضایعات آلومینیوم
• تولید و فروش مقاطع اختصاصی و صنعتی آلومینیوم
• آبکاری آنادایز
• رنگ الکترواستاتیک

📍 **مراکز ما:**
🏭 کارخانه: اراک
📦 توزیع: شمس آباد تهران

برای مشاهده محصولات و اطلاعات تماس، روی دکمه زیر کلیک کنید:"""

        # Create web app button
        keyboard = InlineKeyboardMarkup([
            [InlineKeyboardButton(
                "🚀 مشاهده محصولات و تماس با ما",
                web_app=WebAppInfo(url=WEB_APP_URL)
            )]
        ])

        await update.message.reply_text(
            welcome_message,
            reply_markup=keyboard,
            parse_mode='Markdown'
        )
        
        logger.info(f"Start command sent to user {update.effective_user.id}")
        
    except Exception as e:
        logger.error(f"Error in start command: {e}")
        await update.message.reply_text(
            "متأسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید."
        )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    Handle /help command
    """
    help_text = """📋 **راهنمای استفاده:**

/start - شروع و مشاهده منوی اصلی
/help - نمایش این راهنما

🔗 **راه‌های تماس مستقیم:**
📞 تماس: 09120268457
💬 واتساپ: 09227590763
📱 تلگرام: @Aluminimiran_bot

برای مشاهده کامل محصولات از دکمه وب اپ استفاده کنید."""

    await update.message.reply_text(help_text, parse_mode='Markdown')

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    Handle errors
    """
    logger.error(f"Exception while handling an update: {context.error}")

def main() -> None:
    """
    Start the bot
    """
    # Create the Application
    application = Application.builder().token(BOT_TOKEN).build()

    # Add handlers
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("help", help_command))
    
    # Add error handler
    application.add_error_handler(error_handler)

    # Run the bot
    logger.info("Starting Aluminum Iran Bot...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()
