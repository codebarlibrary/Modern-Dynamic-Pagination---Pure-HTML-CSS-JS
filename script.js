const paginationNumbers = document.getElementById("pagination-numbers");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let totalPages = 40; 
let currentPage = 1;

function createPagination() {
    paginationNumbers.innerHTML = "";
    const pages = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);

        if (currentPage > 3) {
            pages.push("...");
        }

        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage <= 3) {
            start = 2;
            end = 4;
        }
        
        if (currentPage >= totalPages - 2) {
            start = totalPages - 3;
            end = totalPages - 1;
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);
    }

    pages.forEach(page => {
        const btn = document.createElement("button");
        btn.innerText = page;
        btn.classList.add("page-number");
        if (page === "...") btn.classList.add("dots");
        if (page === currentPage) btn.classList.add("active");

        btn.onclick = () => {
            if (page !== "...") {
                currentPage = page;
                createPagination();
            }
        };
        paginationNumbers.appendChild(btn);
    });

    prevBtn.disabled = (currentPage === 1);
    nextBtn.disabled = (currentPage === totalPages);
}

prevBtn.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        createPagination();
    }
};

nextBtn.onclick = () => {
    if (currentPage < totalPages) {
        currentPage++;
        createPagination();
    }
};

createPagination();