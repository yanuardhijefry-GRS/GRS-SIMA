const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });
}

<script src="js/dashboard.js"></script>
<script src="js/export.js"></script>
</body>
