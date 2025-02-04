"use server"

export async function personalDetailsAction(data: any) {
    console.log("personalDetailsAction", data);

    // Example: Validate the data
    if (!data.firstName || !data.lastName || !data.contactNumber) {
        throw new Error("Missing required fields");
    }

    // Example: Process the data (e.g., save to a database)
    // This is a placeholder for actual database logic
    try {
        // Assume saveToDatabase is a function that saves data to your database
        // await saveToDatabase(data);
        console.log("Data saved successfully");
    } catch (error) {
        console.error("Error saving data", error);
        throw new Error("Failed to save data");
    }

    return { success: true, message: "Personal details saved successfully" };
}