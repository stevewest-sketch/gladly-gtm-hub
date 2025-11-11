import { client } from "@/lib/sanity";

async function getContact() {
  const query = `*[_type == "contact"][0]{
    title,
    description,
    email,
    phone,
    address
  }`;
  return await client.fetch(query);
}

export default async function Contact() {
  const contact = await getContact();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          {contact?.title || "Contact Us"}
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          {contact?.description && (
            <p className="text-lg text-gray-600 mb-8">{contact.description}</p>
          )}

          <div className="space-y-6">
            {contact?.email && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Email</h3>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            )}

            {contact?.phone && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Phone</h3>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
            )}

            {contact?.address && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Address</h3>
                <p className="text-gray-600 whitespace-pre-line">{contact.address}</p>
              </div>
            )}

            {!contact?.email && !contact?.phone && !contact?.address && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No contact information yet.</p>
                <p className="text-sm text-gray-500">
                  Add your contact details through the Sanity Studio.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
