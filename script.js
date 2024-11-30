// 現在の時刻に基づいてGIF画像を動的に変更するスクリプト
window.addEventListener("DOMContentLoaded", () => {
    const gifElement = document.getElementById("dynamic-gif");

    // 現在時刻を取得
    const now = new Date();
    const hour = now.getHours();

    // 時間帯に応じて画像を変更
    let gifSrc = "";

    if (hour >= 5 && hour < 16) {
        gifSrc = "scene1改良.gif"; // 早朝～午後4時まで
    } else if (hour >= 16 && hour < 19) {
        gifSrc = "scene2改良.gif"; // 午後4時～午後7時まで
    } else {
        gifSrc = "scene3改良.gif"; // 午後7時～早朝5時まで
    }

    // GIF画像を設定
    gifElement.src = gifSrc;
    gifElement.alt = `GIF for time period: ${gifSrc}`;
});
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animated-heading");

    // Intersection Observer APIの設定
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // アニメーションを開始
                    entry.target.classList.add("animate");
                    observer.unobserve(entry.target); // 1度だけアニメーションする
                }
            });
        },
        {
            root: null, // ビューポートを基準に監視
            threshold: 0.1, // 10%が見えたらトリガー
        }
    );

    // 全ての .animated-heading を監視
    animatedElements.forEach((el) => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const resultDiv = document.getElementById("form-result");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // デフォルトのフォーム送信を防止

        // フォームデータを取得
        const formData = new FormData(form);

        // 非同期でデータを送信
        fetch("send_mail.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.text())
            .then((result) => {
                // 結果メッセージを表示
                resultDiv.textContent = result;
                resultDiv.style.color = "lightgreen"; // 成功時は緑色
                form.reset(); // フォームをリセット
            })
            .catch((error) => {
                // エラーメッセージを表示
                resultDiv.textContent = "Failed to send message. Please try again.";
                resultDiv.style.color = "red"; // エラー時は赤色
            });
    });
});


