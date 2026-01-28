// Countdown Timer for Bizet Hagua Arega Road Project - 24 Hour Challenge
// GLOBAL COUNTDOWN - All visitors see the same timer

class CountdownTimer {
    constructor() {
        // HARDCODED END TIME - 24 hours from start
        // Challenge started: January 28, 2026 at 12:38 PM EST
        // Challenge ends: January 29, 2026 at 12:38 PM EST
        this.endTime = new Date('2026-01-29T12:38:00-05:00').getTime();

        // ============================================
        // DONATION TRACKING - UPDATE THIS VALUE!
        // ============================================
        this.donationGoal = 4000000;  // 4 Million Birr goal
        this.currentDonation = 3730601.23;     // <-- UPDATE THIS when donations come in!
        // ============================================

        // DOM Elements - Countdown
        this.hoursEl = document.getElementById('hours');
        this.minutesEl = document.getElementById('minutes');
        this.secondsEl = document.getElementById('seconds');
        this.progressFill = document.getElementById('progressFill');
        this.progressPercent = document.getElementById('progressPercent');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.statusText = document.getElementById('statusText');

        // DOM Elements - Donation
        this.donationFill = document.getElementById('donationFill');
        this.amountRaised = document.getElementById('amountRaised');
        this.donationPercent = document.getElementById('donationPercent');
        this.amountRemaining = document.getElementById('amountRemaining');

        // Hide control buttons - timer is automatic
        this.startBtn.style.display = 'none';
        this.resetBtn.style.display = 'none';

        // Start the countdown immediately
        this.startCountdown();

        // Update donation display
        this.updateDonationDisplay();
    }

    updateDonationDisplay() {
        // Format the donation amount with commas
        const formattedAmount = this.currentDonation.toLocaleString();
        this.amountRaised.textContent = `${formattedAmount} Birr`;

        // Calculate percentage
        const percent = Math.min(100, (this.currentDonation / this.donationGoal) * 100);
        this.donationFill.style.width = `${percent}%`;
        this.donationPercent.textContent = `${percent.toFixed(1)}% of goal reached`;

        // Calculate and display remaining
        const remaining = Math.max(0, this.donationGoal - this.currentDonation);
        const formattedRemaining = remaining.toLocaleString();
        this.amountRemaining.textContent = `Remaining: ${formattedRemaining} Birr`;
    }

    startCountdown() {
        // Update immediately
        this.updateDisplay();

        // Then update every second
        this.intervalId = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    updateDisplay() {
        const now = Date.now();
        const remainingMs = this.endTime - now;

        // Total duration is 24 hours
        const totalMs = 24 * 60 * 60 * 1000;

        if (remainingMs <= 0) {
            // Challenge completed!
            this.hoursEl.textContent = '00';
            this.minutesEl.textContent = '00';
            this.secondsEl.textContent = '00';
            this.progressFill.style.width = '100%';
            this.progressPercent.textContent = '100%';
            this.statusText.textContent = 'Challenge COMPLETED! 🎉';
            document.querySelector('.status-icon').textContent = '🏆';
            document.querySelector('.countdown-wrapper').classList.add('finished');
            clearInterval(this.intervalId);
            this.celebrate();
            return;
        }

        // Calculate time components
        const remainingSeconds = Math.floor(remainingMs / 1000);
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;

        // Update values with animation
        this.updateValue(this.hoursEl, String(hours).padStart(2, '0'));
        this.updateValue(this.minutesEl, String(minutes).padStart(2, '0'));
        this.updateValue(this.secondsEl, String(seconds).padStart(2, '0'));

        // Update progress bar
        const elapsedMs = totalMs - remainingMs;
        const progress = Math.min(100, (elapsedMs / totalMs) * 100);
        this.progressFill.style.width = `${progress}%`;
        this.progressPercent.textContent = `${Math.round(progress)}%`;

        // Update status
        this.statusText.textContent = 'Challenge in progress!';
        document.querySelector('.status-icon').textContent = '🔥';
    }

    updateValue(element, newValue) {
        if (element.textContent !== newValue) {
            element.textContent = newValue;
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 300);
        }
    }

    celebrate() {
        // Create confetti effect
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}vw;
                    top: -10px;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                    z-index: 1000;
                `;
                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 4000);
            }, i * 50);
        }

        // Add confetti animation if not exists
        if (!document.querySelector('#confettiStyle')) {
            const style = document.createElement('style');
            style.id = 'confettiStyle';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize countdown when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
});
