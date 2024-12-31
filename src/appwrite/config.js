// Service.js
import conf from "../conf/conf.js";
import { Client, Databases } from "appwrite";

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    console.log(conf.appwriteUrl);

    this.databases = new Databases(this.client);
  }

  async createFile({ fileId, appwriteId, fileName, content, language }) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        appwriteId,
        {
          fileId,
          fileName,
          content,
          language,
        }
      );
      return response;
    } catch (error) {
      console.error("Appwrite service :: createFile :: error", error);
      throw error;
    }
  }

  async updateFile(appwriteId, { fileId, fileName, content, language }) {
    try {
      const response = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        appwriteId,
        {
          fileId,
          fileName,
          content,
          language,
        }
      );
      return response;
    } catch (error) {
      console.error("Appwrite service :: updateFile :: error", error);
      throw error;
    }
  }

  async deleteFile(appwriteId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        appwriteId
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
      throw error;
    }
  }

  async getFiles() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
      return response.documents;
    } catch (error) {
      console.error("Appwrite service :: getFiles :: error", error);
      throw error;
    }
  }
}

const service = new Service();
export default service;
