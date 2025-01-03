<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import LineSeparator from "$lib/components/LineSeparator.svelte";

    const sections = [
        {
            title: "Quick Overview",
            content: [
                "What data do we collect? Personal data provided by you during your use of our services.",
                "What about sensitive data? In certain cases, with your permission, we may process sensitive data, such as location.",
                "Do we collect data from third parties? No, all data is collected directly from you.",
                "Are your data safe? We work to protect your data, but no technology is 100% secure.",
                "What are your rights? You can request access, corrections, or deletion of your data."
            ]
        },
        {
            title: "1. What Data Do We Collect?",
            content: [
                "Your name and surname",
                "Email address",
                "Username",
                "Password",
                "Location data (with permission)",
                "Gender data",
                "Height data",
                "Weight data"
            ]
        },
        {
            title: "2. Why Do We Use Your Data?",
            content: [
                "Enable account creation and login",
                "Provide requested services",
                "Respond to your inquiries and offer support"
            ]
        },
        {
            title: "3. In What Situations Do We Use Your Data?",
            content: [
                "Your permission",
                "Contractual obligations (e.g., providing services)",
                "Legal requirements",
                "Protecting vital interests (e.g., preventing harm)"
            ]
        },
        {
            title: "4. When and With Whom Do We Share Your Data?",
            content: [
                "We share geolocation data with your teachers, who will reward your activities tracked through the mobile application."
            ]
        },
        {
            title: "5. How Long Do We Retain Your Data?",
            content: [
                "We retain your data only as long as it is necessary for the purpose it was collected, or until you request its deletion."
            ]
        },
        {
            title: "6. How Do We Protect Your Data?",
            content: [
                "We strive to protect your data using state-of-the-art technology. However, as data transmission over the internet is never completely secure, we cannot guarantee absolute protection."
            ]
        },
        {
            title: "7. What Are Your Rights?",
            content: [
                "Accessing the data we have about you",
                "Requesting corrections or deletion of your data",
                "To exercise your rights, contact us at admin@green-stem.eu"
            ]
        },
        {
            title: "8. What About the \"Do-Not-Track\" Option?",
            content: [
                "Since the app is designed for tracking user activity by teachers, there is currently no \"Do-Not-Track\" option."
            ]
        },
        {
            title: "9. Updates to This Policy",
            content: [
                "We may update this Privacy Policy periodically. Any changes will be announced on our website or via email."
            ]
        }
    ];
</script>

<div class="flex flex-col p-4 text-gray-300">
    <BackHeader class="my-4" href="/profile/profile-settings">Privacy Policy</BackHeader>

    <div class="mb-6">
        <p class="text-sm text-white text-center">
            Last Updated: December 26, 2024
        </p>
    </div>

    <LineSeparator/>

    <div class="text-white space-y-6 mt-4">
        <div class="text-sm leading-relaxed space-y-4">
            <p>
                This Privacy Policy for V. gimnazija, Zagreb (hereinafter referred to as "we," "us," or "our")
                describes how and why we collect, use, and share your personal data when you use our application.
            </p>

            <p>This includes:</p>
            <ul class="ml-4 space-y-2">
                <li class="before:content-['•'] before:mr-2">
                    Visiting our web application at https://aktivan.green-stem.eu or any other pages linked to this Privacy Policy
                </li>
                <li class="before:content-['•'] before:mr-2">
                    Downloading and using our mobile application aktiVan or any other applications we provide
                </li>
                <li class="before:content-['•'] before:mr-2">
                    Participating in our events, marketing activities, or other similar situations
                </li>
            </ul>

            <p>
                This Privacy Policy is designed to help you better understand how we protect your personal data.
                If you do not agree with the practices described here, please refrain from using our services.
            </p>
        </div>

        <LineSeparator/>

        {#each sections as section}
            <div class="mb-6">
                <h3 class="text-lg font-semibold mb-3">{section.title}</h3>
                <ul class="space-y-2">
                    {#each section.content as item}
                        <li class="text-sm leading-relaxed ml-4 before:content-['•'] before:mr-2">
                            {item}
                        </li>
                    {/each}
                </ul>
            </div>
            <LineSeparator/>
        {/each}

        <div class="mt-6">
            <h3 class="text-lg font-semibold mb-3">10. Contact Us</h3>
            <div class="text-sm space-y-2">
                <p>Have questions or need assistance? Contact us:</p>
                <p>Email: <a href="mailto:admin@green-stem.eu" class="text-blue-400 hover:underline">
                    admin@green-stem.eu
                </a></p>
                <p>Address:</p>
                <p>V. gimnazija, Zagreb</p>
                <p>Klaićeva 1, 10000 Zagreb, Croatia</p>
            </div>
        </div>

        <div class="mt-6">
            <h3 class="text-lg font-semibold mb-3">11. How to Manage Your Data?</h3>
            <p class="text-sm leading-relaxed">
                Want to review, update, or delete your data? Send us a request via email, and we will assist you.
            </p>
        </div>
    </div>
</div>
