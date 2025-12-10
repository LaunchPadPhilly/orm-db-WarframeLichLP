"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  // State (Step #2)
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Placeholder fetch (Step #3 comes later)
  useEffect(() => {
    async function loadProjects() {
      setLoading(true);

      try {
        // TODO: Replace with actual API request
        const data = [];
        setProjects(data);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h1 className="text-5xl font-bold">My Projects</h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {showForm ? "Close Form" : "Add New Project"}
          </button>
        </div>

        {/* Show form when toggled */}
        {showForm && (
          <div className="mb-8 p-6 border rounded bg-gray-50">
            {/* Placeholder — will be replaced by ProjectForm */}
            <p className="text-gray-700">Project form goes here.</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <p className="text-center text-gray-600">Loading projects...</p>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No projects yet</h2>
            <p className="text-gray-600 mb-6">
              Get started by setting up your database and implementing the API routes!
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-bold text-blue-900 mb-2">🚀 Getting Started:</h3>
              <ol className="text-blue-800 space-y-1 list-decimal list-inside text-left">
                <li>Set up your Neon database</li>
                <li>Implement the API routes</li>
                <li>Add project creation functionality</li>
                <li>Convert this page to use database data</li>
              </ol>
            </div>
          </div>
        )}

        {/* Projects grid */}
        {!loading && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-white font-bold text-xl">No Image</p>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.technologies?.slice(0, 3).map((tech, index) => (
                      <span key={index} className="text-sm bg-gray-200 px-3 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="text-sm text-gray-500 px-3 py-1">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>

                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Ideas (kept from simple version) */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mt-12">
          <h3 className="font-bold text-yellow-900 mb-2">💡 Project Ideas:</h3>
          <ul className="text-yellow-800 space-y-1">
            <li>• Past school projects</li>
            <li>• Personal coding projects</li>
            <li>• Design work or creative projects</li>
            <li>• Future projects you want to build</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
