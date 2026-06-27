💸 FinPilot AI
<p align="center">
<img src="./assets/banner.png" width="100%" alt="FinPilot AI Banner"/>
</p>
<h1 align="center">
🚀 AI-Powered Personal Finance Super App
</h1>
<p align="center">
<img src="https://img.shields.io/badge/React%20Native-0.85-blue?style=for-the-badge&logo=react"/>
<img src="https://img.shields.io/badge/Expo-SDK%2056-black?style=for-the-badge&logo=expo"/>
<img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript"/>
<img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase"/>
<img src="https://img.shields.io/badge/OpenAI-AI-412991?style=for-the-badge&logo=openai"/>
<img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge"/>
<img src="https://img.shields.io/badge/License-MIT-success?style=for-the-badge"/>
</p>
🌟 Overview

FinPilot AI is a modern AI-powered personal finance application built with React Native, Expo, TypeScript, and Supabase.

Unlike traditional expense trackers, FinPilot AI combines intelligent automation with modern fintech experiences.

Users can:

* 💰 Track income & expenses
* 🧾 Scan receipts using AI
* 🎤 Add transactions using voice
* 📱 Scan UPI QR codes and pay
* 🤖 Receive AI-powered financial insights
* 📊 Visualize spending through beautiful analytics
* 🎯 Manage budgets and savings goals

The vision of FinPilot AI is to become an AI Financial Companion, not just another expense tracker.

✨ Features

📱 UPI Scan & Pay

Scan any UPI QR code.

Supported

* Google Pay
* PhonePe
* Paytm
* BHIM
* Amazon Pay
* Any UPI App

Features

* QR Scanner
* Merchant Detection
* Editable Amount
* Payment Preview
* Deep Linking
* Automatic Transaction Recording

  
💳 Smart Transactions

* Add Income
* Add Expense
* Edit Transactions
* Delete Transactions
* Search Transactions
* Filter by Category
* Filter by Type
* Transaction History
* Transaction Details
* Swipe Actions
* Auto Category Detection
* Merchant Detection
* Notes
* Tags
* Payment Method
* Receipt Attachment

🧾 AI Receipt Scanner

Simply scan a receipt using your phone camera.

FinPilot AI automatically extracts:

* Merchant
* Total Amount
* Date
* Purchased Items
* Category
* Notes

Features

* OCR Receipt Recognition
* AI Merchant Detection
* AI Category Prediction
* Receipt Preview
* Editable Before Saving
* Receipt Storage
* Receipt Viewer

🎤 Voice Transactions

Simply say

Paid ₹450 to Domino’s using UPI

FinPilot AI extracts

* Merchant
* Amount
* Category
* Payment Method
* Date
* Notes

No manual typing required.

📊 Dashboard

Beautiful dashboard with

* Total Balance
* Monthly Income
* Monthly Expense
* Spending Trend
* Recent Transactions
* Quick Actions
* Monthly Analytics
* AI Insights

📈 Analytics

Modern financial charts including

* Monthly Expense Trend
* Income vs Expense
* Category Distribution
* Spending Trends
* Highest Spending Month
* Average Monthly Expense
* Budget Usage

🤖 AI Finance Coach

Receive intelligent recommendations like

* Spending Analysis
* Savings Suggestions
* Budget Alerts
* Category Insights
* Monthly Summary
* Financial Tips

🎯 Budget Management

Manage your monthly finances

* Monthly Budget
* Remaining Budget
* Budget Progress
* Savings Goals
* Financial Health

🌙 Premium UI

Features

* Modern Cards
* Smooth Navigation
* Beautiful Charts
* Dark Theme
* Responsive Layout
* Floating Action Buttons
* Swipe Gestures
* Premium Animations

📸 Screenshots

Dashboard
  <p align="center">
<img src="./screenshots/dashboard.png" width="250"/>
</p>

Transactions
<p align="center">
<img src="./screenshots/transactions.png" width="250"/>
</p>

Analytics
<p align="center">
<img src="./screenshots/analytics.png" width="250"/>
</p>

AI Coach
<p align="center">
<img src="./screenshots/ai.png" width="250"/>
</p>

Receipt Scanner
<p align="center">
<img src="./screenshots/receipt.png" width="250"/>
</p>

UPI Scan & Pay
<p align="center">
<img src="./screenshots/upi.png" width="250"/>
</p>

🏗 Architecture

                   User

                     │

                     ▼

         React Native (Expo)

                     │

     ┌───────────────┼───────────────┐
     │               │               │

 Dashboard      Transactions      Analytics

     │               │               │

 Receipt OCR    Voice Input     AI Coach

     │               │               │

             React Query

                   │

                   ▼

             Supabase Backend

     ┌───────────┼────────────┐

 Authentication Database Storage

                   │

                   ▼

          OpenAI / Gemini APIs

                   │

                   ▼

             AI Recommendations


🛠 Tech Stack

Mobile

* React Native
* Expo SDK 56
* TypeScript
* Expo Router

Backend

* Supabase
* PostgreSQL
* Storage
* Authentication

AI

* OpenAI
* Google Gemini
* OCR
* AI Categorization

State Management

* Zustand

Server State

* TanStack React Query

Charts

* React Native Chart Kit

Styling

* React Native
* Custom Design System

Payments

* UPI Deep Linking
* QR Scanner

Authentication

* Supabase Auth


🚀 Why FinPilot AI?

Unlike traditional expense trackers, FinPilot AI combines Artificial Intelligence, UPI Payments, Receipt OCR, Voice Recognition, and Financial Analytics into one intelligent ecosystem.

It is designed to reduce manual work while helping users make smarter financial decisions.
