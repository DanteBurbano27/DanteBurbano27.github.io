from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.models.base import Base

class Project(Base):
    __tablename__ = "projects"
    
    name = Column(String(150), index=True, nullable=False)
    slug = Column(String(150), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    html_url = Column(String(255), nullable=False)
    is_private = Column(Boolean, default=False)
    
    metrics = relationship("RepositoryMetric", back_populates="project", uselist=False, cascade="all, delete-orphan")
    tech_stack = relationship("TechStack", back_populates="project", cascade="all, delete-orphan")

class RepositoryMetric(Base):
    __tablename__ = "repository_metrics"
    
    project_id = Column(String(36), ForeignKey("projects.id"), unique=True, nullable=False)
    stars = Column(Integer, default=0)
    forks = Column(Integer, default=0)
    open_issues = Column(Integer, default=0)
    watchers = Column(Integer, default=0)
    
    project = relationship("Project", back_populates="metrics")

class TechStack(Base):
    __tablename__ = "tech_stacks"
    
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    language = Column(String(50), nullable=False)
    bytes_written = Column(Integer, default=0)
    
    project = relationship("Project", back_populates="tech_stack")
