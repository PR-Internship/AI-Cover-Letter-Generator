document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resume-form');
    const uploadZone = document.getElementById('upload-zone');
    const resumeInput = document.getElementById('resume');
    const fileNameDisplay = document.getElementById('file-name-display');
    const fileInfoBadge = document.getElementById('file-info-badge');
    const uploadTexts = document.querySelector('.upload-texts');
    const submitButton = document.getElementById('submit-button');
    const btnSpinner = submitButton.querySelector('.btn-spinner');
    const btnText = submitButton.querySelector('.btn-text');
    
    const idleState = document.getElementById('idle-state');
    const resultSection = document.getElementById('result');
    
    const outputDiv = document.getElementById('output');
    const copyBtn = document.getElementById('copy-btn');
    const copyBtnText = document.getElementById('copy-btn-text');

    function renderContent(markdownText) {
        if (window.marked && typeof window.marked.parse === 'function') {
            outputDiv.innerHTML = window.marked.parse(markdownText);
        } else {
            outputDiv.textContent = markdownText;
        }
    }

    function updateFileDisplay(file) {
        if (file) {
            fileNameDisplay.textContent = file.name;
            fileInfoBadge.hidden = false;
            uploadTexts.style.opacity = '0.3';
        } else {
            fileNameDisplay.textContent = 'No file selected';
            fileInfoBadge.hidden = true;
            uploadTexts.style.opacity = '1';
        }
    }

    resumeInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        updateFileDisplay(file);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadZone.classList.add('drag-active');
            uploadZone.style.borderColor = 'var(--accent-color)';
            uploadZone.style.background = 'rgba(99, 102, 241, 0.08)';
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadZone.classList.remove('drag-active');
            uploadZone.style.borderColor = 'rgba(99, 102, 241, 0.3)';
            uploadZone.style.background = 'rgba(7, 9, 17, 0.4)';
        }, false);
    });

    uploadZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            resumeInput.files = files;
            updateFileDisplay(files[0]);
        }
    });

    resumeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const role = document.getElementById('role').value.trim();
        const company = document.getElementById('company').value.trim();
        const skills = document.getElementById('skills').value.trim();
        const resumeFile = resumeInput.files[0];

        submitButton.disabled = true;
        btnSpinner.hidden = false;
        btnText.textContent = 'Generating Cover Letter...';

        const resultPanel = document.querySelector('.result-panel');
        if (resultPanel) {
            resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('role', role);
            formData.append('company', company);
            formData.append('skills', skills);
            if (resumeFile) {
                formData.append('resume', resumeFile);
            }

            const isLocalStatic = window.location.port === '8000' || window.location.protocol === 'file:';
            const apiUrl = isLocalStatic ? 'http://localhost:5001/api/resume/analyze' : '/api/resume/analyze';

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Server returned an error.');
            }

            renderContent(data.coverLetter);
            
            idleState.hidden = true;
            resultSection.hidden = false;

        } catch (error) {
            console.error('Error generating cover letter:', error);
            alert(error.message || 'An error occurred while generating the cover letter. Please try again.');
            
            if (resultSection.hidden) {
                idleState.hidden = false;
            }
        } finally {
            submitButton.disabled = false;
            btnSpinner.hidden = true;
            btnText.textContent = 'Generate Cover Letter';
        }
    });

    copyBtn.addEventListener('click', () => {
        const textToCopy = outputDiv.innerText;

        function showSuccessFeedback() {
            const originalText = copyBtnText.textContent;
            copyBtnText.textContent = 'Copied to Clipboard!';
            copyBtn.style.borderColor = '#10b981';
            copyBtn.style.color = '#10b981';
            
            const originalIconHTML = copyBtn.querySelector('svg').innerHTML;
            copyBtn.querySelector('svg').innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />`;

            setTimeout(() => {
                copyBtnText.textContent = originalText;
                copyBtn.style.borderColor = 'rgba(79, 70, 229, 0.3)';
                copyBtn.style.color = 'var(--accent-color)';
                copyBtn.querySelector('svg').innerHTML = originalIconHTML;
            }, 2000);
        }

        function fallbackCopy(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.width = '2em';
            textArea.style.height = '2em';
            textArea.style.padding = '0';
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';
            textArea.style.background = 'transparent';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showSuccessFeedback();
                } else {
                    alert('Failed to copy text. Please select and copy manually.');
                }
            } catch (err) {
                console.error('Fallback copy failed:', err);
                alert('Failed to copy text. Please select and copy manually.');
            }
            document.body.removeChild(textArea);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showSuccessFeedback();
            }).catch(err => {
                console.warn('Clipboard API failed, trying fallback...', err);
                fallbackCopy(textToCopy);
            });
        } else {
            fallbackCopy(textToCopy);
        }
    });
});